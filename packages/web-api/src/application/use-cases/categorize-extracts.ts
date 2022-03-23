import { Category, Extract } from '@domain';
import {
    IUseCase,
    IUseCaseFactory,
    IExtractRepository,
    ICategoryRepository,
} from '../ports';
import { CategoryNotFoundError, ExtractNotFoundError } from '@common/errors';
export type CategorizeExtractsInputParams = {
    extractId: string;
    category: string;
    userId: string;
};
type Return = {
    success: boolean;
};
type Dependencies = {
    extractsRepository: IExtractRepository;
    categoriesRepository: ICategoryRepository;
};

export type ICategorizeExtractsUseCase = IUseCase<CategorizeExtractsInputParams, Return>;
export type ICategorizeExtractsUseCaseFactory = IUseCaseFactory<
    Dependencies,
    CategorizeExtractsInputParams,
    Return
>;

export const CategorizeExtractsUseCaseFactory: ICategorizeExtractsUseCaseFactory = ({
    extractsRepository,
    categoriesRepository
}) => {
    return {
        execute: async ({ userId, category: categoryName, extractId }) => {
            const categoryDTO = (await categoriesRepository.getByNameFromUser(userId, categoryName))[0];
            if(!categoryDTO) throw new CategoryNotFoundError();
            
            const newExtractDTO = await extractsRepository.getById(extractId);
            if(!newExtractDTO) throw new ExtractNotFoundError();
            
            const categoryExtractDTOs = await extractsRepository.getByCategoryId(categoryDTO.id!);
            // console.log(newExtractDTO.categoryId);
            // console.log('categoryExtractDTOs',[...categoryExtractDTOs]);
            // if extract has a different category, old category has to be updated first
            if(newExtractDTO.categoryId && newExtractDTO.categoryId !== categoryDTO.id) {
                const oldCategoryDTO = await categoriesRepository.getById(newExtractDTO.categoryId);
                const oldCategoryExtractDTOs = await extractsRepository.getByCategoryId(oldCategoryDTO!.id!);
                
                const oldCategory = new Category({
                    total: oldCategoryDTO!.total,
                    extracts: oldCategoryExtractDTOs.map(dto => new Extract({id: dto.id}))
                });

                oldCategory.removeExtract(new Extract({
                    id: newExtractDTO.id,
                    amount: newExtractDTO.amount
                }));

                // console.log({oldCategoryExtractDTOs});

                await categoriesRepository.updateCategory({
                    id: oldCategoryDTO!.id,
                    total: oldCategory.total,
                    extracts: oldCategoryExtractDTOs.filter(e => e.id !== newExtractDTO.id)
                });
            }

            const category = new Category({
                name: categoryDTO.name,
                total: categoryDTO.total,
                extracts: categoryExtractDTOs.map(dto => new Extract({id: dto.id}))
            });

            category.addNewExtract(new Extract({
                id: newExtractDTO.id,
                amount: newExtractDTO.amount
            }));
            await categoriesRepository.updateCategory({
                id: categoryDTO.id,
                total: category.total,
                extracts: [...categoryExtractDTOs, newExtractDTO]
            });

            return { success: true };
        },
    };
};

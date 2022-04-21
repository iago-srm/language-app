import {
  IUseCase,
  IUseCaseFactory,
  ICategoryRepository,
  CategoryDTO,
  IOpenBankingService,
  IUserRepository,
} from '../ports';
import { UserNotFoundError } from '@common/errors';

export type GetCategoriesInputParams = {
  userId: string;
};
type Return = {
  categories: any[];
};
type Dependencies = {
  categoriesRepository: ICategoryRepository;
};

export type IGetCategoriesUseCase = IUseCase<GetCategoriesInputParams, Return>;
export type IGetCategoriesUseCaseFactory = IUseCaseFactory<
  Dependencies,
  GetCategoriesInputParams,
  Return
>;

export const GetCategoriesUseCaseFactory: IGetCategoriesUseCaseFactory = ({
  categoriesRepository,
}) => {
  return {
    execute: async ({ userId }) => {
      const categoriesDTOs = await categoriesRepository.getAllFromUser(userId);

      return {
        categories: categoriesDTOs.map((c) => ({ ...c, user: undefined })),
      };
    },
  };
};

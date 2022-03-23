import {
    IUseCase,
    IUseCaseFactory,
    IExtractRepository,
    ExtractDTO,
    IOpenBankingService,
    IUserRepository
} from '../ports';
import { UserNotFoundError } from '@common/errors';

export type GetExtractsInputParams = {
    userId: string;
};
type Return = {
    extracts: ExtractDTO[];
};
type Dependencies = {
    userRepository: IUserRepository;
    extractsRepository: IExtractRepository;
    openBankingService: IOpenBankingService;
};

export type IGetExtractsUseCase = IUseCase<GetExtractsInputParams, Return>;
export type IGetExtractsUseCaseFactory = IUseCaseFactory<
    Dependencies,
    GetExtractsInputParams,
    Return
>;

export const GetExtractsUseCaseFactory: IGetExtractsUseCaseFactory = ({
    userRepository,
    extractsRepository,
    openBankingService
}) => {
    return {
        execute: async ({ userId }) => {
            const userDTO = await userRepository.getUserById(userId);
            if(!userDTO) throw new UserNotFoundError();

            const oldExtractDTOs = await extractsRepository.getAllFromUser(userId);
            const newExtractDTOs = (await openBankingService.getExtracts(userDTO!.cpf, userDTO!.lastExtractFetch)).map(extract => ({...extract, user: userDTO}));
            
            const extracts = [...oldExtractDTOs, ...newExtractDTOs]
            userDTO.lastExtractFetch = Date.now();
            userDTO.extracts = extracts;
            await userRepository.updateUser(userDTO);

            return {extracts: extracts.map(extract => ({...extract, user: undefined}))};
        },
    };
};

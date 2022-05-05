import {
    IUseCase,
    IUseCaseFactory,
    IUserRepository,
    UserDTO,
    IEncryptionService
} from '../ports';
import { User } from '@domain';

export type InputParams = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
};
type Return = void;
type Dependencies = {
    userRepository: IUserRepository;
    encryptionService: IEncryptionService;
};

export type ISignUpUseCase = IUseCase<InputParams, Return>;
export type ISignUpUseCaseFactory = IUseCaseFactory<
    Dependencies,
    InputParams,
    Return
>;

export const SignUpUseCaseFactory: ISignUpUseCaseFactory = ({
    userRepository,
    encryptionService
}) => {
    return {
        execute: async ({ email, name, password, confirmPassword }) => {
            const user = new User({ email, name, password, confirmPassword });

            const userDTO = {
                email: user.getEmail(),
                cpf: user.getCPF(),
                name: user.getName(),
                role: "STUDENT",
                hashedPassword: await encryptionService.encrypt(user.getPassword()),
                extracts: [],
                lastExtractFetch: 0
            };
            // console.log(userDTO)
            await userRepository.insertUser(userDTO)
        },
    };
};

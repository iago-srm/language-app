import {
    IUseCase,
    IUseCaseFactory,
    IUserRepository,
    UserDTO,
    IEncryptionService
} from '../ports';
import { User } from '@domain';
import { PasswordsDontMatchError } from '@common/errors';

export type InputParams = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    role: string;
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
        execute: async ({ email, name, password, confirmPassword, role }) => {
            const user = new User({ email, name, role, password });

            if(password !== confirmPassword) throw new PasswordsDontMatchError();

            const userDTO = {
                email: user.personId.email,
                name: user.personId.name,
                role: user.role,
                hashedPassword: await encryptionService.encrypt(user.password),
            } as UserDTO;

            await userRepository.insertUser(userDTO)
        },
    };
};

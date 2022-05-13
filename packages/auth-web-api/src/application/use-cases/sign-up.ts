import {
  IUseCase,
  IUseCaseFactory,
  IUserRepository,
  UserDTO,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
} from '../ports';
import { User } from '@domain';
import {
  PasswordsDontMatchError,
  EmailAlreadySignedupError,
} from '@common/errors';

export type InputParams = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
};
type Return = {
  token: String;
};
type Dependencies = {
  userRepository: IUserRepository;
  encryptionService: IEncryptionService;
  tokenService: ITokenService;
  idService: IIdGenerator;
};

export type ISignUpUseCase = IUseCase<InputParams, Return>;
export type ISignUpUseCaseFactory = IUseCaseFactory<
  Dependencies,
  InputParams,
  Return
>;

export const SignUpUseCaseFactory: ISignUpUseCaseFactory = ({
  userRepository,
  encryptionService,
  tokenService,
  idService,
}) => {
  return {
    execute: async ({ email, name, password, confirmPassword, role }) => {
      const user = new User({ email, name, role, password });

      const existingUser = await userRepository.getUserByEmail(email);

      if (existingUser) throw new EmailAlreadySignedupError();

      if (password !== confirmPassword) throw new PasswordsDontMatchError();

      const userDTO: UserDTO = {
        id: idService.getId(),
        email: user.personId.email,
        name: user.personId.name,
        role: user.role,
        hashedPassword: await encryptionService.encrypt(user.password),
        tokenVersion: 0,
      };

      await userRepository.insertUser(userDTO);

      const token = tokenService.generate({
        id: userDTO.id,
        tokenVersion: userDTO.tokenVersion,
      });

      return { token };
    },
  };
};

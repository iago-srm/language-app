import {
  IUseCase,
  IUseCaseFactory,
  IUserRepository,
  UserDTO,
  IEncryptionService,
} from '../ports';
import { User } from '@domain';
import { CategoryDTO } from '@/application/ports/repository/category';

export type InputParams = {
  email: string;
  cpf: string;
  name: string;
  password: string;
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
  encryptionService,
}) => {
  return {
    execute: async ({ email, cpf, name, password }) => {
      const user = new User({ email, cpf, name, password });
      const categoryDTOs = user.categories.map((category) => {
        const dto = new CategoryDTO();
        dto.name = category.name;
        dto.total = 0;
        return dto;
      });

      const userDTO = {
        email: user.getEmail(),
        cpf: user.getCPF(),
        name: user.getName(),
        hashedPassword: await encryptionService.encrypt(user.getPassword()),
        extracts: [],
        categories: categoryDTOs,
        lastExtractFetch: 0,
      };
      // console.log(userDTO)
      await userRepository.insertUser(userDTO);
    },
  };
};

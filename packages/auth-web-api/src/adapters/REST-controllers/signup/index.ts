import { ISignUpUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../../ports/REST-controllers';
import SerializeSignupBody from './serializer';

export const SignUpControllerFactory = ({
    signUpUseCase,
}: {
    signUpUseCase: ISignUpUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body) => {
        const { email, password, name, confirmPassword, role } = SerializeSignupBody(body);

        await signUpUseCase.execute({
            email,
            name,
            password,
            confirmPassword,
            role
        });

        return {
            response: '',
            statusCode: 201,
        };
    };

    return {
        controller: fn,
        method: 'post',
        path: 'signup'
    };
};


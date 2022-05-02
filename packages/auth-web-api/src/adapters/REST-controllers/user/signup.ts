import { ISignUpUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../../ports/REST-controllers';
import { ParameterNotProvidedError } from '@common/errors';

export const SignUpControllerFactory = ({
    signUpUseCase,
}: {
    signUpUseCase: ISignUpUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body) => {
        const email = body.email;
        const cpf = body.cpf;
        const name = body.name;
        const password = body.password;

        if(!email || !cpf || !name || !password) throw new ParameterNotProvidedError();

        await signUpUseCase.execute({
            email,
            cpf,
            name,
            password
        });

        return {
            response: '',
            statusCode: 201,
        };
    };

    return {
        controller: fn,
        method: 'post',
        path: '/signup'
    };
};


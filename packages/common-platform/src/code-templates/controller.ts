// import { ISOMEUseCase } from '@application/use-cases';
// import { SOMEHTTPDefinition } from '@language-app/common';
// import {
//   IHTTPController,
//   IHTTPControllerDescriptor,
// } from '@language-app/common';

// export const SOMEControllerFactory = ({
//   SOMEUseCase,
// }: {
//   SOMEUseCase: ISOMEUseCase;
// }): IHTTPControllerDescriptor<IHTTPController> => {
//   const fn: IHTTPController = async (_, __, ___, { user }) => {

//     const { id, tokenVersion } = user;

//     const resp = await SOMEUseCase.execute({
//       id,
//       tokenVersion,
//     });

//     return {
//       response: resp,
//       statusCode: 200,
//     };
//   };

//   return {
//     controller: fn,
//     method: SOMEHTTPDefinition.method,
//     path: SOMEHTTPDefinition.path,
//     middlewares: ['auth']
//   };
// };

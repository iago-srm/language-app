import * as awilix from 'awilix';

export const getControllers = (container: awilix.AwilixContainer) => {
  const controllers = []
  for (let registrationName in container.registrations) {
    if(registrationName.includes("Controller")) {
      controllers.push(container.resolve(registrationName));
    }
  }
  return controllers;
}

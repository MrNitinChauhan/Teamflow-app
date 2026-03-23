import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
  
  
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication,RestBindings,RestServer} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  TokenServiceBindings,
} from '@loopback/authentication-jwt';
import cookieParser from 'cookie-parser';
export {ApplicationConfig};

export class BackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super({
      ...options,
      rest: {
        cors: {
          origin: 'http://localhost:5173',
          credentials: true,
          allowedHeaders: ['Content-Type', 'Authorization'],
          methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        },
      },
    });

    
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      process.env.JWT_SECRET ?? 'secret',
    );
    this.expressMiddleware('middleware.cookieParser', cookieParser());

    

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}

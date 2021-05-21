# Tag-Interceptor

The Tag-interceptor Service is responsible for multiple servers.   
    
Forward Proxy - redirect cdn/tps requests to the local mocks.    
TPS Mock - responsible for handling visits/events.   
CDN Mock - responsible for handling dv scripts.     
Data Store - responsible for storing received events per test-id.   

### Env Variables

copy the content of `.env.example` file to `.env` file and replace the values with relevant ones.

some of the values have defaults, you can see the ones that have defaults in the config file.
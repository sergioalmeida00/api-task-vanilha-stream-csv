import http from 'node:http';
import { jsonMiddleware } from './Middleware/jsonMiddleware.js';
import { extractQueryParams } from './Utils/extract-query-params.js';
import { routes } from './routes.js';
const port = 3001;

const server = http.createServer(async(request, response) => {
    const{method,url} = request;
    await jsonMiddleware(request, response);

    const route = routes.find((route) => {
        return route.method === method && route.endpoint.test(url)
    });

    if(route){
        const routeParams = request.url.match(route.endpoint)

        const { query, ...params } = routeParams.groups
        
        request.query = query ? extractQueryParams(query) : {}
        request.params = params

       return route.handler(request,response);
   }else{
      return response.writeHead(404);
   }

});

server.listen(port, () => console.log('Server is Running 🚀️🚀️'));
# Naver Maps Geocoding API Server

This is a simple, bare-bones API server that uses the [Naver Maps Geocoding API](https://api.ncloud-docs.com/docs/en/ai-naver-mapsgeocoding-geocode) to get the latitude and longitude of an address. This is useful for when you want to use the Naver Maps API but don't want to expose your API key to the client. The server is powered by fastify and is written in JavaScript. Originally created for the [LiveCorona project](https://github.com/LiveCoronaDetector/livecod).

## Getting Started
First, clone this repository. Then, copy the `config.example.json`, rename it to `config.json`, and fill in the blanks. Finally, install the dependencies to run the server.
```bash
$ npm install
$ npm start
```

## API
### GET /
#### Query Parameters
- `address`: Address to search for

#### Response
The response data returns everything that the Naver Maps Geocoding API returns. For more information, please refer to [Naver Maps Geocoding API Documentation](https://api.ncloud-docs.com/docs/en/ai-naver-mapsgeocoding-geocode#responses).

## License
GNU GPLv3
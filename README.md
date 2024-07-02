# FullstackJSDev-ImageProcessingAPI
 
### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Instructions
The server will listen on port 3000:

#### Images endpoint
http://localhost:3000/api/images

Query arguments are:
- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical value > 0
- _height_: numerical value > 0

#### Display the fjord image (Ex: Santa Monica)
http://localhost:3000/api/images?filename=santamonica

#### Scale the image and store the resulting thumbnail
http://localhost:3000/api/images?filename=santamonica&width=100&height=100
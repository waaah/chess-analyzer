FROM emscripten/emsdk:latest

WORKDIR /app
# Clone the stockfish.wasm repo
RUN git clone https://github.com/nmrugg/stockfish.js.git
WORKDIR /app/stockfish.js
COPY move-stockfish-build.sh move.sh

# Install npm dependencies
RUN ls -la
RUN npm install
RUN emsdk install 3.1.7
RUN emsdk activate 3.1.7
# Run the build
RUN ./build.js --help
RUN ./build.js

# Create the build folder
RUN mkdir build

# Final image doesn't need to do anything, just built output
CMD ["./move.sh"]
FROM node:latest

WORKDIR /app
RUN git clone https://github.com/lichess-org/chess-openings.git
WORKDIR /app/chess-openings

COPY tsv_to_json.js .
RUN node tsv_to_json.js openings.json a.tsv b.tsv c.tsv d.tsv e.tsv
RUN mkdir openings

CMD ["cp", "-v", "openings.json", "openings/openings.json"]
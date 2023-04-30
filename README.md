# Test Dinheirow - Software Engineer

A Pokedex Api

## How to run

1 - Install docker & authenticate on docker hub

2 - Go to clone directory and run make setup

3 - Access: http://pokedex.localhost:8282

## Briefing
> Esta API deverá seguir o mínimo de práticas RESTful e conter listagens, busca, paginação e filtros. 
> Fique à vontade para decidir quais filtros são mais interessantes.


### Data Sample


| Row | Name      | Pokedex Number | Img name | Generation | Evolution Stage | Evolved | FamilyID | Cross Gen | Type 1   | Type 2 | Weather 1   | Weather 2   | STAT TOTAL | ATK | DEF | STA | Legendary | Aquireable | Spawns | Regional | Raidable | Hatchable | Shiny | Nest | New | Not-Gettable | Future Evolve | 100% CP @ 40 | 100% CP @ 39 |
|-----|-----------|----------------|----------|------------|-----------------|---------|----------|-----------|----------|--------|-------------|-------------|------------|-----|-----|-----|-----------|------------|--------|----------|----------|-----------|-------|------|-----|--------------|---------------|--------------|--------------|
| 2   | Ivysaur   | 2              | 2        | 1          | 2               | 0       | 1        | 0         | grass    | poison | Sunny/clear | Cloudy      | 422        | 151 | 151 | 120 | 0         | 1          | 1      | 0        | 0        | 0         | 0     | 0    | 0   | 0            | 0             | 1552         | 1529         | 
| 229 | Houndoom  | 229            | 229      | 2          | 2               | 1       | 119      | 0         | dark     | fire   | Fog         | Sunny/clear | 533        | 224 | 159 | 150 | 0         | 1          | 1      | 0        | 0        | 0         | 0     | 0    | 0   | 0            | 0             | 2529         | 2493         | 
| 536 | Blitzle   | 522            | 522      | 5          |                 | 0       |          | 0         | electric |        | Rainy       |             | 272        | 118 | 64  | 90  | 0         | 0          | 0      | 0        | 0        | 0         | 0     | 0    | 0   | 0            | 0             | 756          | 745          | 
| 809 | Tapu Fini | 788            | 788      | 7          | Evolved         | 0       |          | 0         | water    | fairy  | Rainy       | Cloudy      | 590        | 189 | 261 | 140 | 1         | 0          | 0      | 0        | 0        | 0         | 0     | 0    | 0   | 0            | 0             | 2635         | 2597         | 


# The Plan

1 - The data really fit a relational database context, model database in this case Postgresql

2 - Data need some normalization before the ingest

2 - Ingest the data, but check the write pressure on database use some technique for evicts back-pressure

4 - Read the data from Postgresql and use the FTI index for search



## Functional Requisites


| Code   | Description                     |
|--------|---------------------------------|
| #RF 01 | List Pokedex Index              |
| #RF 02 | Display Pokemon Details         |
| #RF 03 | Query per Pokemon Name          |
| #RF 04 | Facted Search for Relation Data |


## Non-functional Requisites


| Syntax  | Description                |
|---------|----------------------------|
| #RFN 01 | Simple Setup               |
| #RFN 02 | 80% Coverage               |
| #RFN 03 | Stress Test for 10k req/s  |
| #RFN 04 | Log utility to check stats |


## The Infra Diagram

| LB (traefik) | -> | 2 app server | -> | Postgresql |

### Sidecar

| Docker Logs | -> | GoAccess |

## Why not use a cache in application ?

This data is not generate per user, because this a better simple approach for run with a correct Cache Headers & Etag is
fine

### Help

``run $ make``


### Troubleshoot

Ports 8080, 8282 need not before used
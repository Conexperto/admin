# Admin Conexperto

Conexperto, aims to be a social network to learn and grow. We believe that people learn best from other people, it was like that for a long time and this is how we actually learn from our environment.

This repository houses the code for all operation of the Admin's in Conexperto.

## Getting Started 🚀

### Prerequisities

In order to run this container you'll need docker installed.

- [Windows](https://docs.docker.com/windows/started)
- [OS X](https://docs.docker.com/mac/started/)
- [Linux](https://docs.docker.com/linux/started/)

### Instructions 🧐

Clone the repository and move to the project directory.

```sh
git clone git@gitlab.com:conexperto/admin.git
```

Run build container.

```sh
docker-compose build
```

Run start container admin.

```sh
docker-compose up admin
```

Initialize migration of database.

```sh
docker-compose exec api db upgrade
```

then visit <http://localhost:5000/api/v1/>

## Seeds

```
docker-compose exec api seed <seed> <up|down>
```

e.g.

```
docker-compose exec api seed user up
```

See folder `src/seeds` for more options.

## Discussion 💬

- Discuss Conexperto Server on [Github Discussions](https://github.com/conexperto/admin/discussions)

## Contributing 🎢

To contribute, please review the issues in the projects section [projects](https://github.com/conexperto/admin/projects/1)

In order to maintain consistency and readability of commit messages, this convention is used [ConventionalCommits](https://www.conventionalcommits.org/en/v1.0.0/)

To maintain a stable & quality code, the following hooks have been used with [pre-commit](https://pre-commit.com/).

- [husky](https://github.com/typicode/husky)
- [eslint](https://github.com/eslint/eslint)
- [prettier](https://github.com/prettier/prettier)
- [lint-staged](https://github.com/okonet/lint-staged)
- [@commitlint](https://github.com/conventional-changelog/commitlint)

To install the husky and use your hook configuration.

```sh
npm run prepare
```

or

```sh
yarn prepare
```

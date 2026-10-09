<h1 align="center"><img alt="epilot-logo" src="https://github.com/epilot-dev/concorde-elements/blob/main/docs/assets/logo.png?raw=true" width="200"><br>epilot-elements</h1>

[![CI](https://github.com/epilot-dev/concorde-elements/actions/workflows/node.js.yml/badge.svg)](https://github.com/epilot-dev/concorde-elements/actions/workflows/node.js.yml)
[![NPM Version](https://img.shields.io/npm/v/%40epilot%2Fconcorde-elements)](https://www.npmjs.com/package/@epilot/concorde-elements)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/concorde-elements/blob/main/)

This is a multi purpose UI library used internally by epilot journeys. It could be used for any kind of projects, including building apps for epilot journeys.

Concorde was the internal code name used by epilot devs to migrate epilot journeys to use a more modern ui components. The goal was enhance the UX while making it simple & fast.

## Quick Start

### Installation

Install the package via npm:

```sh
npm install --save @epilot/concorde-elements
```

### Usage

Components could be simply used like:

```typescript
import { Button } from '@epilot/concorde-elements'

export function SomeComponent() {
  return (<Button variant='primary' label='Hello' />)
}
```

# Documentation

- [Storybook](https://portal.epilot.cloud/concorde-elements)
- [Developing for epilot Journeys](https://docs.epilot.io/docs/journeys/developer-resources)

# Contributing

The epilot elements library is a free and open source software. PRs welcome! 🚀

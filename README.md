oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gql-llm
$ gql-llm COMMAND
running command...
$ gql-llm (--version)
gql-llm/0.0.0 linux-x64 node-v20.12.1
$ gql-llm --help [COMMAND]
USAGE
  $ gql-llm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gql-llm hello PERSON`](#gql-llm-hello-person)
* [`gql-llm hello world`](#gql-llm-hello-world)
* [`gql-llm help [COMMAND]`](#gql-llm-help-command)
* [`gql-llm plugins`](#gql-llm-plugins)
* [`gql-llm plugins add PLUGIN`](#gql-llm-plugins-add-plugin)
* [`gql-llm plugins:inspect PLUGIN...`](#gql-llm-pluginsinspect-plugin)
* [`gql-llm plugins install PLUGIN`](#gql-llm-plugins-install-plugin)
* [`gql-llm plugins link PATH`](#gql-llm-plugins-link-path)
* [`gql-llm plugins remove [PLUGIN]`](#gql-llm-plugins-remove-plugin)
* [`gql-llm plugins reset`](#gql-llm-plugins-reset)
* [`gql-llm plugins uninstall [PLUGIN]`](#gql-llm-plugins-uninstall-plugin)
* [`gql-llm plugins unlink [PLUGIN]`](#gql-llm-plugins-unlink-plugin)
* [`gql-llm plugins update`](#gql-llm-plugins-update)

## `gql-llm hello PERSON`

Say hello

```
USAGE
  $ gql-llm hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/maxneuvians/graphql-llm-query/blob/v0.0.0/src/commands/hello/index.ts)_

## `gql-llm hello world`

Say hello world

```
USAGE
  $ gql-llm hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ gql-llm hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/maxneuvians/graphql-llm-query/blob/v0.0.0/src/commands/hello/world.ts)_

## `gql-llm help [COMMAND]`

Display help for gql-llm.

```
USAGE
  $ gql-llm help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for gql-llm.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.21/src/commands/help.ts)_

## `gql-llm plugins`

List installed plugins.

```
USAGE
  $ gql-llm plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ gql-llm plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.15/src/commands/plugins/index.ts)_

## `gql-llm plugins add PLUGIN`

Installs a plugin into gql-llm.

```
USAGE
  $ gql-llm plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into gql-llm.

  Uses bundled npm executable to install plugins into /home/codespace/.local/share/gql-llm

  Installation of a user-installed plugin will override a core plugin.

  Use the GQL_LLM_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the GQL_LLM_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ gql-llm plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ gql-llm plugins add myplugin

  Install a plugin from a github url.

    $ gql-llm plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ gql-llm plugins add someuser/someplugin
```

## `gql-llm plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ gql-llm plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ gql-llm plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.15/src/commands/plugins/inspect.ts)_

## `gql-llm plugins install PLUGIN`

Installs a plugin into gql-llm.

```
USAGE
  $ gql-llm plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into gql-llm.

  Uses bundled npm executable to install plugins into /home/codespace/.local/share/gql-llm

  Installation of a user-installed plugin will override a core plugin.

  Use the GQL_LLM_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the GQL_LLM_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ gql-llm plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ gql-llm plugins install myplugin

  Install a plugin from a github url.

    $ gql-llm plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ gql-llm plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.15/src/commands/plugins/install.ts)_

## `gql-llm plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ gql-llm plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ gql-llm plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.15/src/commands/plugins/link.ts)_

## `gql-llm plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ gql-llm plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ gql-llm plugins unlink
  $ gql-llm plugins remove

EXAMPLES
  $ gql-llm plugins remove myplugin
```

## `gql-llm plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ gql-llm plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.15/src/commands/plugins/reset.ts)_

## `gql-llm plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ gql-llm plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ gql-llm plugins unlink
  $ gql-llm plugins remove

EXAMPLES
  $ gql-llm plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.15/src/commands/plugins/uninstall.ts)_

## `gql-llm plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ gql-llm plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ gql-llm plugins unlink
  $ gql-llm plugins remove

EXAMPLES
  $ gql-llm plugins unlink myplugin
```

## `gql-llm plugins update`

Update installed plugins.

```
USAGE
  $ gql-llm plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.15/src/commands/plugins/update.ts)_
<!-- commandsstop -->

# DataToSQL README

This is a simple extension to convert data copied from something like Excel or a database query results to a column aligned formatted SQL line used in as a row for an Insert statement. Initial version does not do any type checking, so you need to include the quotes where necessary.

## Example

Converts

```
'C'	10	abc
'DE'	1	abcde
'FGH'	2345	zyx
```

to:

```
('C'  , 10  , abc  ),
('DE' , 1   , abcde),
('FGH', 2345, zyx  ),
```

## Commands

In the _Command Palette_, type **Data** and choose the command:

`Data To SQL: Convert` -> To convert selected lines.

## Requirements

This extension has no requirements or dependencies.

## Extension Settings

This extension has no extension settings.

## Known Issues

None at this time.

## Release Notes

See past versions in change log.

## Source

[GIT](https://github.com/eckmanca66/DataToSql)

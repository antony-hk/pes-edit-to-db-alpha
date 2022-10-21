import meow from 'meow';
// import unicornFun from 'pes-edit2db';
// import unicornFun from 'unicorn-fun';
import main from './edit-to-db.mjs';

const cli = meow(`
	Usage
	  $ node cli.mjs [input]

	Options
	  --postfix  Lorem ipsum  [Default: rainbows]

	Examples
	  $ cli-name
	  unicorns & rainbows
	  $ cli-name ponies
	  ponies & rainbows
`, {
	flags: {
		postfix: {
			type: 'string',
			default: 'rainbows'
		}
	}
});

// console.log(moduleName(cli.input[0] || 'unicorns', cli.flags));
main(...cli.input);


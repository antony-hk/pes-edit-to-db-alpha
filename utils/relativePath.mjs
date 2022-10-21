import path from 'path';

export default function relativePath(input) {
    if (input.slice(1,3) === ':\\') {
        return input;
    }

    const __dirname = path.dirname(process.argv[1]);
    return path.join(__dirname, input);
}

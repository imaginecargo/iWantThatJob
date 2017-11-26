export default function clear() {
    const { stdout } = process;
    if (!stdout.isTTY) return;
    stdout.write('\x1bc');
}

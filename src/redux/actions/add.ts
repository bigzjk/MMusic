export default function addAction(num: number) {
    return {
        type: 'RECEIVE_ADD',
        num,
    }
}

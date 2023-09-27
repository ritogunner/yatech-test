let a = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7];
let m = 4;
let k = 10;

function solution(arr, step, pair) {
    let sumPair = 0;

    for (let i = 0; i <= arr.length - step; i++) {
        const subarray = arr.slice(i, i + step);
        let pairFound = false;

        for (let j = 0; j < subarray.length; j++) {
            for (let l = j + 1; l < subarray.length; l++) {
                if (subarray[j] + subarray[l] === pair) {
                    pairFound = true;
                    break;
                }
            }
            if (pairFound) {
                break;
            }
        }

        if (pairFound) {
            sumPair++;
        }
    }

    return sumPair;
}

// helper
function getArgs() {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(arg => {
            // long arg
            if (arg.slice(0, 2) === '--') {
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2, longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flags
            else if (arg[0] === '-') {
                const flags = arg.slice(1, arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

const args = getArgs()

args.number = args.number && args.number.split(',').map((v) => parseInt(v)) || a
args.step = parseInt(args.step || m)
args.pair = parseInt(args.pair || k)

console.log(solution(args.number, args.step, args.pair))
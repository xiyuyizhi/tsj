#!/usr/bin/env node




import fse = require("fs-extra")
import path = require("path")


type ArgInfo = {
    nodePath: string,
    entryPath: string,
    projectName: string,
    type: number
}



function argsParse(argv: Array<string>): ArgInfo {
    const UsageInfo = `tsJ Usage:
    tsJ  -h   // show Usage details
    tsJ  <ProjectName>
`
    if (argv.length <= 2 || argv[2] === '-h') {
        console.log(UsageInfo)
        process.exit(1);
    }

    const [nodePath, entryPath, projectName, type] = argv

    return {
        nodePath,
        entryPath,
        projectName,
        type: Number(type)
    }

}

async function userInteractive() {
    return await new Promise((resolve) => {
        process.stdin.on('readable', () => {
            let inp: Buffer;
            while ((inp = process.stdin.read()) !== null) {
                resolve('' + inp.slice(0, -1));
                process.stdin.end();
            }
        });
    })
}

async function checkExist(pjName: string) {
    const dir = path.join(process.cwd(), pjName);

    if (fse.existsSync(dir)) {
        console.log(`dir exist,does overwrite it? [Y/N]`)
        let ret = await userInteractive();
        if ((ret as string).toLowerCase() !== 'y') {
            process.exit(1);
        }
    }

    fse.emptyDirSync(dir)
    console.log(`${dir} init successed!`)
    return dir;
}

async function start() {

    const { projectName, type } = argsParse(process.argv);

    const dest = await checkExist(projectName);

    const src = path.join(__dirname, '../', '_template')

    fse.copySync(src, dest, { overwrite: true });

    const jsonPath = path.join(dest, 'package.json');

    let pckJson = fse.readJSONSync(jsonPath)

    pckJson.name = projectName;

    fse.writeJSONSync(jsonPath, pckJson, { spaces: 4 });

    console.log(`init ${projectName} successed!`);

}

start();
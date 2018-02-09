//git@bitbucket.org:onlyme12/client.git
//git@bitbucket.org:onlyme12/backend.git


var shell = require('shelljs');
if(!shell.which("go")){
    if(shell.env.GIO_LAUNCHED_DESKTOP_FILE !== undefined){
        if(shell.env.GIO_LAUNCHED_DESKTOP_FILE.indexOf("jetbrains") == -1){
            shell.echo("Sorry, this project requires go :(");
        }else {
            shell.echo("this script works only outside of an IDE - please start it on a normal terminal")
        }
    }
    shell.exec("printenv");
    shell.exit(1);
}
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.exec("git clone https://bitbucket.org/onlyme12/client.git && cd client && npm install"); //works
shell.exec("git clone https://bitbucket.org/onlyme12/backend");



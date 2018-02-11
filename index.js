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
    shell.echo("Something is wrong with your GoLang installation - Have you GoLang:1.9? Have you set and exported a GOBIN enivornment variable? - please look in the readme");
    shell.echo("sorry that it doesn't work on your machine. In case you're only interested in the results you can view it here: http://207.154.214.32/geocv/#/welcome. But be patient this machine is cheap and slow ;)");
    shell.exit(1);
}
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.exec("git clone https://bitbucket.org/onlyme12/client.git && cd client && npm install"); //works
shell.exec("git clone https://bitbucket.org/onlyme12/backend");



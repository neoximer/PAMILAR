# PAMILAR #
PAMILAR (Pkt Announcement MIner Log pARser) is a small utility created to easily have some statistics about the Announcements and Block Miners operating on the PacketCrypt (PKT) network project.

After parsing log files it produces a table in the console showing Timeframe, Hashrate and Shares statistics.
Setting the GENERATE_CSV variable to 1 will also output a .csv file (more on env variables below).

<br>

## How to install (npm and node required) ##

_This step is required only if you want to modify the code_

```
git clone https://github.com/neoximer/PAMILAR
cd PAMILAR
npm install
```
<br>

## Configure and run PAMILAR ##

In the root of the project there's a convenient ```.env``` file used for configuring PAMILAR, and its content should be set before launching the program.

Current supported options are listed in the table below.

| **PARAMETER**    | **DESCRIPTION**                                  | **VALUE**  |
|------------------|--------------------------------------------------|------------|
| BLK_PARSER       | Enable/Disable block miner log parser            | bool [0/1] |
| BLK_LOG_FILENAME | Block miner log absolute path+filename           | string     |
| ANN_PARSER       | Enable/Disable announcement miner log parser     | bool [0/1] |
| ANN_LOG_FILENAME | Announcement miner log absolute path+filename    | string     |
| GENERATE_BLK_CSV | Enable/Disable block miner csv generation        | bool [0/1] |
| GENERATE_ANN_CSV | Enable/Disable announcement miner csv generation | bool [0/1] |

_Note: values marked as "bool" are considered enabled if set to 1 and disabled if set to 0._

<br>

After the .env file configuration PAMILAR is ready to go.

The compiled js file is in the ```build``` folder, it can be run with a simple:
```
node pamilar.js
```
<br>

## Generate logs to be parsed ##

If you are running the blkminer and/or the annminer on Unix you can easily save a log by launching the process inside a screen window.
You can install screen using your packet manager (i.e. ```apt install screen```)
Then run the screen session with the ```-L``` flag:
```
screen -L -S blockminer
```
or:
```
screen -L -S annminer
```

In this way a file named screenlog.# will be generated in the folder where screen has been launched.


☕If you like my work and wanna buy me a coffee to keep me awake and coding you can support me using the following

```PKT: pkt1qlr97jl865eqctlyl66dtatdkp9dnldgtp532t9```

```ETH (ERC20 or BEP20): 0x952c1d82b85cfaaef6e1a39f1cf32aee4614ad01```

```BTC (Bitcoin Network): 1JKbAYq8zsfTR1tNx6tqpqgi4rFvWX6uGE```

module.exports = {
  apps : [
    {
    name   : "app1",
    script : "./src/index.js",
    watch: true,
    autorestart: true,
    exec_mode: 'cluster',
    instances: '1',
    max_memory_restart: '1000M',
    args: '--puerto=8082',
    },
    {
    name   : "app2",
    script : "./src/index.js",
    watch: true,
    autorestart: true,
    exec_mode: 'cluster',
    instances: '1',
    max_memory_restart: '1000M',
    args: '--puerto=8083',
    },
    {
      name   : "app3",
      script : "./src/index.js",
      watch: true,
      autorestart: true,
      exec_mode: 'cluster',
      instances: '1',
      max_memory_restart: '1000M',
      args: '--puerto=8084',
    },
    {
      name   : "app4",
      script : "./src/index.js",
      watch: true,
      autorestart: true,
      exec_mode: 'cluster',
      instances: '1',
      max_memory_restart: '1000M',
      args: '--puerto=8085',
    }
]
}

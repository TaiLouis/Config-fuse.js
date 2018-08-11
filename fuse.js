const {
    FuseBox, SassPlugin, CSSPlugin, QuantumPlugin
  } = require('fuse-box')
  
  const development = process.env.NODE_ENV !== 'production'
    && !process.argv.includes('--production')
  
  const fuse = FuseBox.init({
    homeDir: 'src',
    target: 'browser@es5',
    output: 'public/$name.js',
    useTypescriptCompiler: true,
    plugins: [
      [SassPlugin(), development ? CSSPlugin() : CSSPlugin({
        outFile: _ => 'public/app.css',
      })],
      !development && QuantumPlugin({
        uglify: true,
        css: { clean : true },
        bakeApiIntoBundle: true
      })
    ]
  })
  
  const bundle = fuse.bundle('app')
    .instructions('> index.js')
  
  if (development) {
    bundle.hmr({ reload: true}).watch()
    fuse.dev()
  }
  
  fuse.run()
export default async function externalComponent(name: string) {
  if (window[name]) {
    return window[name]
  }

  const resources = window.plugins[name]
  for (const type of resources) {
    switch (type) {
      case 'js': {
        const url = `/plugins/${name}/${name}.umd.min.js`
        window[name] = new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.async = true
          script.addEventListener('load', () => {
            resolve(window[name])
          })
          script.addEventListener('error', () => {
            reject(new Error(`Error loading ${url}`))
          })
          script.src = url
          document.head.appendChild(script)
        })
        break
      }
      case 'css': {
        const css = document.createElement('link')
        css.rel = 'stylesheet'
        css.href = `/plugins/${name}/${name}.css`
        document.head.appendChild(css)
        break
      }
    }
  }

  return window[name]
}

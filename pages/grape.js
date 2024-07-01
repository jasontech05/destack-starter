import 'https://cdnjs.cloudflare.com/ajax/libs/grapesjs/0.17.4/css/grapes.min.css'

export { getStaticProps } from 'destack/build/server'
import { ContentProvider } from 'destack/build/browser/grapes'

const Index = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <ContentProvider {...props} />
    </div>
  )
}
export default Index
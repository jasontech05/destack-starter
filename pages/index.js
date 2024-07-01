import { ContentProviderGrapes } from 'destack'
import 'grapesjs/dist/css/grapes.min.css'

export { getStaticProps } from 'destack/build/server'

export default function Page(props) { 
    return (
        <div style={{height: '100%'}}>
            <span>Hello world</span>
            <ContentProviderGrapes {...props}/>
        </div>)
}
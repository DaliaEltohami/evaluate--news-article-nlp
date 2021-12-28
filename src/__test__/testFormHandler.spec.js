// import babel-polyfill add the beginning of the file to ensure the polyfills are loaded first
import 'babel-polyfill'
import { handleSubmit } from "../client/js/formHandler";


describe("Testing the submit functionality", ()=>{
    test("Testing the handleSubmit function",()=>{        
        expect(handleSubmit).toBeDefined();
    })

})
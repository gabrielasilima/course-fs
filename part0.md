# Part 0 - Exercises

## 0.4: New diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Usuário escreve uma nova nota no campo de texto

    Note right of browser: Usuário clica no botão "submit"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP 302 redirect to /notes
    deactivate server

    Note right of browser: O navegador segue o redirect automaticamente

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document atualizado
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: O navegador executa o JS

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON com as notas (incluindo a nova)
    deactivate server

    Note right of browser: O navegador renderiza a lista de notas atualizada

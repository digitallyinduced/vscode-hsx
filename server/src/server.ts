// Forked From: https://github.com/microsoft/vscode-extension-samples/blob/master/lsp-embedded-request-forwarding/server/src/server.ts

import { getLanguageService } from "vscode-html-languageservice"
import {
  createConnection,
  InitializeParams,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from "vscode-languageserver/node"
import { TextDocument } from "vscode-languageserver-textdocument"

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all)

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

const htmlLanguageService = getLanguageService()

connection.onInitialize((_params: InitializeParams) => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
      // Tell the client that the server supports code completion
      completionProvider: {
        resolveProvider: false,
      },
    },
  }
})

connection.onCompletion(async (textDocumentPosition, token) => {
  const document = documents.get(textDocumentPosition.textDocument.uri)
  if (!document) {
    return null
  }

  return htmlLanguageService.doComplete(
    document,
    textDocumentPosition.position,
    htmlLanguageService.parseHTMLDocument(document),
  )
})

documents.listen(connection)
connection.listen()

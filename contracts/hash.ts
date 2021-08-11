declare module '@ioc:Adonis/Core/Hash' {
  interface HashersList {
    argon: {
      config: ArgonConfig
      implementation: ArgonContract
    }
  }
}

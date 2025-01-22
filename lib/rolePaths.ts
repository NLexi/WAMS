type RolePaths = {
    [role: string]: {
      [path: string]: string[];
    };
  };
  
  const rolePaths: RolePaths = {
    ADMIN: {
      "/protected/admin": ["GET", "POST"],
      "/protected/editor": ["GET", "POST", "PUT", "DELETE"]
    },
    USER: {
      
    },
    EDITOR: {
      "/protected/editor": ["GET", "POST", "PUT", "DELETE"],
    }
  };
  
  export default rolePaths;
  
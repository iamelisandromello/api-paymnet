export const SchemeTransformer = {
  map: (data: any): any => {
    const { _id, name, ...rest } = data
    return { ...rest, schemeId: _id, scheme: name }
  }
}

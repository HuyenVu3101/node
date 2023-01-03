const Handlebars = require('handlebars')
module.exports = {
  ternary: (x, y) => (x ? x : y),
  index: (x) => x + 1,

  sortable: (field, sort) => {
    const icons = {
      default: 'fa-solid fa-sort fs-1',
      asc: 'fa-solid fa-arrow-down-a-z',
      desc: 'fa-solid fa-arrow-down-z-a'
    }
    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc'
    }
    const sortType = field === sort.column ? sort.type : 'default'
    const type = types[sortType]
    const icon = icons[sortType]
    const address = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
    const result = `<a href="${address}"><i class='${icon}'></i></a>`

    return new Handlebars.SafeString(result)
  }
}
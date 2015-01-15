def select_from_autocomplete(term, select, id)
  within "##{id}" do
    find("button").click
    find("input.ui-select-search").set(term)
    click_link(select)
  end
end

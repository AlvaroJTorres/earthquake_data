module ApplicationHelper
  def transform_pagy_metadata(metadata)
    {
      current_page: metadata[:page],
      total: metadata[:count],
      per_page: metadata[:items],
      pages: metadata[:pages]
    }
  end
end

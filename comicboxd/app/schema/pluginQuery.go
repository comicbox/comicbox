package schema

import "context"

type PluginQuery struct {
	query *RootQuery
}

func (q *PluginQuery) Book(ctx context.Context, args BookArgs) (*BookResolver, error) {
	result, err := q.query.Book(ctx, args)
	if err != nil {
		return result, err
	}
	go after("Book", ctx, args, result)
	return result, err
}

func (q *PluginQuery) Books(ctx context.Context, args BooksArgs) (*BookQueryResolver, error) {
	result, err := q.query.Books(ctx, args)
	if err != nil {
		return result, err
	}
	go after("Books", ctx, args, result)
	return result, err
}

func (q *PluginQuery) DeleteBook(ctx context.Context, args DeleteBookArgs) (*BookResolver, error) {
	result, err := q.query.DeleteBook(ctx, args)
	if err != nil {
		return result, err
	}
	go after("DeleteBook", ctx, args, result)
	return result, err
}

func (q *PluginQuery) Me(ctx context.Context) (*UserResolver, error) {
	result, err := q.query.Me(ctx)
	if err != nil {
		return result, err
	}
	go after("Me", ctx, nil, result)
	return result, err
}

func (q *PluginQuery) NewBook(ctx context.Context, args NewBookArgs) (*BookResolver, error) {
	result, err := q.query.NewBook(ctx, args)
	if err != nil {
		return result, err
	}
	go after("NewBook", ctx, args, result)
	return result, err
}

func (q *PluginQuery) NewUser(ctx context.Context, args NewUserArgs) (*UserResolver, error) {
	result, err := q.query.NewUser(ctx, args)
	if err != nil {
		return result, err
	}
	go after("NewUser", ctx, args, result)
	return result, err
}

func (q *PluginQuery) Serie(ctx context.Context, args SerieArgs) (*SeriesResolver, error) {
	result, err := q.query.Serie(ctx, args)
	if err != nil {
		return result, err
	}
	go after("Serie", ctx, args, result)
	return result, err
}

func (q *PluginQuery) Series(ctx context.Context, args SeriesArgs) (*SeriesQueryResolver, error) {
	result, err := q.query.Series(ctx, args)
	if err != nil {
		return result, err
	}
	go after("Series", ctx, args, result)
	return result, err
}

func (q *PluginQuery) UpdateBook(ctx context.Context, args UpdateBookArgs) (*BookResolver, error) {
	result, err := q.query.UpdateBook(ctx, args)
	if err != nil {
		return result, err
	}
	go after("UpdateBook", ctx, args, result)
	return result, err
}

func (q *PluginQuery) UpdateSeries(ctx context.Context, args UpdateSeriesArgs) (*SeriesResolver, error) {
	result, err := q.query.UpdateSeries(ctx, args)
	if err != nil {
		return result, err
	}
	go after("UpdateSeries", ctx, args, result)
	return result, err
}

func (q *PluginQuery) UpdateSeriesBooks(ctx context.Context, args UpdateSeriesBooksArgs) (*SeriesResolver, error) {
	result, err := q.query.UpdateSeriesBooks(ctx, args)
	if err != nil {
		return result, err
	}
	go after("UpdateSeriesBooks", ctx, args, result)
	return result, err
}

func (q *PluginQuery) UpdateUser(ctx context.Context, args UpdateUserArgs) (*UserResolver, error) {
	result, err := q.query.UpdateUser(ctx, args)
	if err != nil {
		return result, err
	}
	go after("UpdateUser", ctx, args, result)
	return result, err
}

func (q *PluginQuery) User(ctx context.Context, args UserArgs) (*UserResolver, error) {
	result, err := q.query.User(ctx, args)
	if err != nil {
		return result, err
	}
	go after("User", ctx, args, result)
	return result, err
}

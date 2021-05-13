import * as React from 'react'
import {NoteApi} from './NoteApi'
import {useNoteApi} from './NoteApiContext'

type DataSource<T> = (noteApi: NoteApi) => Promise<T>;
type ChildRenderer<T> = (data: T, reload: () => void) => React.ReactNode;

type DataSourceStatus = 'loading' | 'success' | 'error';

interface DataLoaderState<TData, TError> {
    dataSourceStatus: DataSourceStatus;
    data?: TData;
    error?: TError;
}

type CreateNewComponentInstanceOnKeyChange = string;

interface DataLoaderProps<TData, TError> {
    dataSource: DataSource<TData>;
    render: ChildRenderer<TData>;
    errorRender?: ChildRenderer<TError>;
    // The key prop ensures that the data loader re-creates itself should this prop change (https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key)
    // It can be used to prevent stale data from being passed to the render function
    key?: CreateNewComponentInstanceOnKeyChange;
}

export const DataLoader = <TData, TError = unknown>(props: DataLoaderProps<TData, TError>): React.ReactElement => {
    const noteApi = useNoteApi()

    const initialState: DataLoaderState<TData, TError> = {
        dataSourceStatus: 'loading',
        data: undefined,
        error: undefined,
    }
    const [loaderState, setLoaderState] = React.useState(initialState)

    const loadData = (): void => {
        setLoaderState(initialState)
        props.dataSource(noteApi)
            .then((result: TData) => {
                setLoaderState({
                    dataSourceStatus: 'success',
                    data: result,
                })
            })
            .catch((error: TError) => {
                console.error('Error in DataLoader:', error)
                if (!!props.errorRender) {
                    setLoaderState({
                        dataSourceStatus: 'error',
                        error: error,
                    })
                }
            })
    }
    React.useEffect(loadData, [props, noteApi])

    switch (loaderState.dataSourceStatus) {
        case 'loading':
            return <Loading/>
        case 'success':
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return <>{props.render(loaderState.data!, loadData)}</>
        case 'error':
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return <>{props.errorRender!(loaderState.error!, loadData)}</>
    }
}

export const Loading: React.FC = () => <div data-testid={'loading'}>Loading...</div>

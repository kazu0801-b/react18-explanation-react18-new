import { Sidebar } from "./Sidebar";
import { AlbumList } from "./AlbumList";
import { TodoList } from "./TodoList";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState, useTransition } from "react";

type Tabs = 'todo' | 'album';

export const ReactQuery = () => {
    const [selectedTab, setSelectedTab] = useState<Tabs>('todo');
    const [isPending,startTransition] = useTransition();

    const buttonStyle = {
        padding:'12px',
        fontSize:'16px',
        border:'none',
        opacity: isPending ? 0.5 : 1,
    }

    const albumButtonStyle = {
        ...buttonStyle,
        backgroundColor: selectedTab === 'album' ? 'royalblue' : 'white',
        color : selectedTab === 'album' ? 'white' : 'black',
    }

    const todoButtonStyle = {
        ...buttonStyle,
        backgroundColor: selectedTab === 'todo' ? 'royalblue' : 'white',
        color : selectedTab === 'todo' ? 'white' : 'black',
    }

    const onClickTabButton = (tab: Tabs) => {
        startTransition(() => {
            setSelectedTab(tab);
        });
    }

    return (
        <div style = {{display: 'flex', padding:'16px'}}>
            <Sidebar/>
            <div style={{flexGrow:1}}>
            <button style={todoButtonStyle} onClick={() => onClickTabButton ('todo')}>Todo</button>
            <button style={albumButtonStyle} onClick ={() => onClickTabButton ('album')}>Album</button>
            <ErrorBoundary fallback = {<p>Todo or AlbumListエラーです</p>}>
                <Suspense fallback={<p>Todo or AlbumListロード中!</p>}>
                {selectedTab === 'todo' ? <TodoList/>:  <AlbumList/>}
                </Suspense>
            </ErrorBoundary>
            </div>
        </div>
    )
}
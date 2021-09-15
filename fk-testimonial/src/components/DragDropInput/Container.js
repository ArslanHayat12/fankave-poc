import React, { useState, useCallback } from 'react';
import { TargetBox } from './TargetBox';
export const Container = ({setDroppedFiles}) => {
    const handleFileDrop = useCallback((item) => {
        if (item) {
            const files = item.files;
            setDroppedFiles(URL.createObjectURL(files[0]));
        }
    }, [setDroppedFiles]);
    return (<>
			<TargetBox onDrop={handleFileDrop}/>
		</>);
};

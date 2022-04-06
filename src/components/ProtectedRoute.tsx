import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';

interface Props {
	children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	return isLoggedIn ? children : <Navigate to={'/signin'} />;
}

import React from 'react';

export default ({ error }) => {
	return error.length === 0 ? null : <span style={{ fontWeight: 100 }}>({error})</span>
}

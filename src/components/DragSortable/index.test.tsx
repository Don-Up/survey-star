import React from 'react';
import {render, screen} from '@testing-library/react';
import {closestCenter, DndContext} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import '@testing-library/jest-dom';

describe('SortableItem', () => {
  test('renders children correctly', () => {
    render(
      <SortableItem id="1">
        <div>Test Item</div>
      </SortableItem>
    );
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

});

describe('SortableContainer', () => {
  const items = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ];

  const onDragEnd = jest.fn();

  test('renders children correctly', () => {
    render(
      <DndContext collisionDetection={closestCenter}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <div>{item.content}</div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

});
import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { colors } from '@atlaskit/theme';
import Column from './Column';
import reorder, { reorderQuoteMap } from './reorder';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {authorQuoteMap} from "./data";

const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: ${colors.B100};
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;


export default class Board extends React.Component {
    static defaultProps = {
        isCombineEnabled: false
    };
    constructor(props) {
        super(props);
        this.state = {
            columns: authorQuoteMap,
            ordered: Object.keys(authorQuoteMap),
            socket: null,
        };
    }

    componentDidMount() {
      const socket = new WebSocket("https://localhost:8080");
    }



    onDragEnd = (result) /* DropResult */ => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...this.state.ordered];
                shallow.splice(result.source.index, 1);
                this.setState({
                    ordered: shallow
                });
                return;
            }

            const column = this.state.columns[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columns = {
                ...this.state.columns,
                [result.source.droppableId]: withQuoteRemoved,
            };
            this.setState({
                columns
            })
            return;
        }
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        if(source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        if (result.type === 'COLUMN') {
            const ordered = reorder(this.state.ordered, source.index, destination.index);
            this.setState({
                ordered,
            });
            return;
        }

        const data = reorderQuoteMap({
            quoteMap: this.state.columns,
            source, 
            destination
        });

        this.setState({
            columns: data.quoteMap,
        });
    }

    render() {
      const column = this.state.columns;
      const ordered = this.state.ordered;

      const {
        containerHeight,
        useClone,
        isCombineEnabled,
        withScrollableColumns,
      } = this.props;

      const board = (
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={containerHeight}
            isCombineEnabled={isCombineEnabled}
          >
          {/* {(provided) => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                  {ordered.map((key, index) => (
                      <Column
                          key={key}
                          index={index}
                          title={key}
                          quote={column[key]}
                          isScrollable={withScrollableColumns}
                          isCombineEnabled={isCombineEnabled}
                          useClone={useClone}
                      />
                  ))}
                  {provided.placeholder}
              </Container>
          )} */}
          </Droppable>  
      );
      return(
          <React.Fragment>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {containerHeight ? (
                <ParentContainer height={containerHeight}>{board}</ParentContainer>
              ) : (
                board
              )}
            </DragDropContext>
            <Global
              styles={css`
                body {
                  background: ${colors.B200};
                }
              `}
            />
          </React.Fragment>
      )
  }
}